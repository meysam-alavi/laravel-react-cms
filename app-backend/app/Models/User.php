<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * User class
 *
 * @mixin Model
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    private $authLang;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function setAuthLang($lang)
    {
        $this->authLang = $lang;
    }

    public function getAuthLang()
    {
        return $this->authLang;
    }
}

// ["__construct","clearBootedModels","withoutTouching","withoutTouchingOn","isIgnoringTouch","preventLazyLoading","handleLazyLoadingViolationUsing","withoutBroadcasting","fill","forceFill","qualifyColumn","qualifyColumns","newInstance","newFromBuilder","on","onWriteConnection","all","with","load","loadMorph","loadMissing","loadAggregate","loadCount","loadMax","loadMin","loadSum","loadAvg","loadExists","loadMorphAggregate","loadMorphCount","loadMorphMax","loadMorphMin","loadMorphSum","loadMorphAvg","update","updateOrFail","updateQuietly","push","saveQuietly","save","saveOrFail","destroy","delete","deleteOrFail","forceDelete","query","newQuery","newModelQuery","newQueryWithoutRelationships","registerGlobalScopes","newQueryWithoutScopes","newQueryWithoutScope","newQueryForRestoration","newEloquentBuilder","newCollection","newPivot","hasNamedScope","callNamedScope","toArray","toJson","jsonSerialize","fresh","refresh","replicate","is","isNot","getConnection","getConnectionName","setConnection","resolveConnection","getConnectionResolver","setConnectionResolver","unsetConnectionResolver","getTable","setTable","getKeyName","setKeyName","getQualifiedKeyName","getKeyType","setKeyType","getIncrementing","setIncrementing","getKey","getQueueableId","getQueueableRelations","getQueueableConnection","getRouteKey","getRouteKeyName","resolveRouteBinding","resolveSoftDeletableRouteBinding","resolveChildRouteBinding","resolveSoftDeletableChildRouteBinding","resolveRouteBindingQuery","getForeignKey","getPerPage","setPerPage","preventsLazyLoading","broadcastChannelRoute","broadcastChannel","__get","__set","offsetExists","offsetGet","offsetSet","offsetUnset","__isset","__unset","__call","__callStatic","__toString","escapeWhenCastingToString","__sleep","__wakeup","attributesToArray","relationsToArray","getAttribute","getAttributeValue","getRelationValue","isRelation","hasGetMutator","hasAttributeMutator","hasAttributeGetMutator","mergeCasts","setAttribute","hasSetMutator","hasAttributeSetMutator","fillJsonAttribute","fromJson","fromEncryptedString","encryptUsing","fromFloat","fromDateTime","getDates","getDateFormat","setDateFormat","hasCast","getCasts","getAttributes","setRawAttributes","getOriginal","getRawOriginal","only","syncOriginal","syncOriginalAttribute","syncOriginalAttributes","syncChanges","isDirty","isClean","wasChanged","getDirty","getChanges","originalIsEquivalent","append","setAppends","hasAppended","getMutatedAttributes","cacheMutatedAttributes","observe","getObservableEvents","setObservableEvents","addObservableEvents","removeObservableEvents","retrieved","saving","saved","updating","updated","creating","created","replicating","deleting","deleted","flushEventListeners","getEventDispatcher","setEventDispatcher","unsetEventDispatcher","withoutEvents","addGlobalScope","hasGlobalScope","getGlobalScope","getGlobalScopes","resolveRelationUsing","hasOne","hasOneThrough","morphOne","belongsTo","morphTo","getActualClassNameForMorph","hasMany","hasManyThrough","morphMany","belongsToMany","morphToMany","morphedByMany","joiningTable","joiningTableSegment","touches","touchOwners","getMorphClass","getRelations","getRelation","relationLoaded","setRelation","unsetRelation","setRelations","withoutRelations","unsetRelations","getTouchedRelations","setTouchedRelations","touch","updateTimestamps","setCreatedAt","setUpdatedAt","freshTimestamp","freshTimestampString","usesTimestamps","getCreatedAtColumn","getUpdatedAtColumn","getQualifiedCreatedAtColumn","getQualifiedUpdatedAtColumn","getHidden","setHidden","getVisible","setVisible","makeVisible","makeVisibleIf","makeHidden","makeHiddenIf","getFillable","fillable","mergeFillable","getGuarded","guard","mergeGuarded","unguard","reguard","isUnguarded","unguarded","isFillable","isGuarded","totallyGuarded","getAuthIdentifierName","getAuthIdentifier","getAuthIdentifierForBroadcasting","getAuthPassword","getRememberToken","setRememberToken","getRememberTokenName","can","canAny","cant","cannot","getEmailForPasswordReset","sendPasswordResetNotification","hasVerifiedEmail","markEmailAsVerified","sendEmailVerificationNotification","getEmailForVerification","tokens","tokenCan","createToken","currentAccessToken","withAccessToken","factory","notifications","readNotifications","unreadNotifications","notify","notifyNow","routeNotificationFor"]
