<?php

namespace App\Jobs;

use DateTime;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Contracts\Redis\LimiterTimeoutException;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;
use Illuminate\Queue\Middleware\WithoutOverlapping;
use Illuminate\Queue\Middleware\ThrottlesExceptions;

class AllUsersCaching implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public User $user;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(object $user)
    {

    }

    /**
     * Execute the job.
     *
     * @return void
     * @throws LimiterTimeoutException
     */
    public function handle(User $user)
    {
        $users = $user->all();
        Storage::append('/cache/users/all-users.data', $users);

        // in 60s allow 10 number of locks
        Redis::throttle('key')->allow(10)->every(60)->then(function () {
            // Lock obtained, process the podcast...
        }, function () {
            // Unable to obtain lock...
            $this->release(10);
        });
    }

    public function middleware(): array
    {
        //return [(new WithoutOverlapping($this->user->id))->releaseAfter(60)];
        /**
         * back off is Time interval between each attempt
         * and decay minutes is Time interval between each throttle job
         */
        return [(new ThrottlesExceptions(10, 5))->backoff(1)];
    }

    /**
     *
     * max attempts (10) allowed occur in 20 minutes
     *
     * @return DateTime
     */
    public function retryUntil(): DateTime
    {
        return now()->addMinute(20);
    }
}
