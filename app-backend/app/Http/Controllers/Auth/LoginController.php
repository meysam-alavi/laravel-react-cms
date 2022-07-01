<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Controller;
use App\Models\PersonalAccessToken;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

/**
 * Login controller class
 *
 * @mixin Model
 */
class LoginController extends AdminController
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = null; //RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->middleware('guest')->except('logout');
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $result = array('data' => null, 'messages' => null, 'success' => false);

        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);

        $lang = $request->lang;

        $user = User::query()->where('email', $request->email)->first();

        //$user->avatar = User::getAvatar($user->id);

        if ($user && Hash::check($request->password, $user->password)) {
            $userInfo = array(
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'gender' => $user->gender,
                'marriage' => $user->marriage,
                'avatar' => $user->avatar
            );

            $token = $user->createToken($user->first_name)->plainTextToken;
            $tokenSlices = explode('|', $token);
            $tokenId = $tokenSlices[0];
            $tokenCode = $tokenSlices[1];

            $tokenObj = PersonalAccessToken::query()->find($tokenId);
            $tokenObj->lang = $lang;
            $tokenObj->save();

            $cacheDir = "/cache/user/{$user->id}";

            if (!Storage::exists($cacheDir)) {
                Storage::makeDirectory($cacheDir);
            }

            $filePath = "{$cacheDir}/auth-{$lang}-info.data";
            $authInfo[$tokenCode] = array(
                'token_id' => $tokenId,
                'user_id' => $user->id,
                'lang' => $lang
            );

            Storage::put($filePath, json_encode($authInfo));

            $result['data'] = array(
                'user' => json_encode($userInfo),
                'token' => $token
            );
            $result['success'] = true;
        }

        return response()->json($result);
    }


    /**
     * logout
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        /*print_r($request->user()->currentAccessToken());
        die;*/

        $result = ['data' => null, 'messages' => null, 'success' => false];

        if ($request->user()->currentAccessToken()->delete()) {
            $result['success'] = true;
        }

        return response()->json($result);
    }
}


/*
 *
 *
 *
 * https://github.com/barryvdh/laravel-ide-helper
 * print_r(get_class_methods($request->user()));
 * Array
(
    [0] => __construct
    [1] => clearBootedModels
    [2] => withoutTouching
    [3] => withoutTouchingOn
    [4] => isIgnoringTouch
    [5] => preventLazyLoading
    [6] => handleLazyLoadingViolationUsing
    [7] => withoutBroadcasting
    [8] => fill
    [9] => forceFill
    [10] => qualifyColumn
    [11] => qualifyColumns
    [12] => newInstance
    [13] => newFromBuilder
    [14] => on
    [15] => onWriteConnection
    [16] => all
    [17] => with
    [18] => load
    [19] => loadMorph
    [20] => loadMissing
    [21] => loadAggregate
    [22] => loadCount
    [23] => loadMax
    [24] => loadMin
    [25] => loadSum
    [26] => loadAvg
    [27] => loadExists
    [28] => loadMorphAggregate
    [29] => loadMorphCount
    [30] => loadMorphMax
    [31] => loadMorphMin
    [32] => loadMorphSum
    [33] => loadMorphAvg
    [34] => update
    [35] => updateOrFail
    [36] => updateQuietly
    [37] => push
    [38] => saveQuietly
    [39] => save
    [40] => saveOrFail
    [41] => destroy
    [42] => delete
    [43] => deleteOrFail
    [44] => forceDelete
    [45] => query
    [46] => newQuery
    [47] => newModelQuery
    [48] => newQueryWithoutRelationships
    [49] => registerGlobalScopes
    [50] => newQueryWithoutScopes
    [51] => newQueryWithoutScope
    [52] => newQueryForRestoration
    [53] => newEloquentBuilder
    [54] => newCollection
    [55] => newPivot
    [56] => hasNamedScope
    [57] => callNamedScope
    [58] => toArray
    [59] => toJson
    [60] => jsonSerialize
    [61] => fresh
    [62] => refresh
    [63] => replicate
    [64] => is
    [65] => isNot
    [66] => getConnection
    [67] => getConnectionName
    [68] => setConnection
    [69] => resolveConnection
    [70] => getConnectionResolver
    [71] => setConnectionResolver
    [72] => unsetConnectionResolver
    [73] => getTable
    [74] => setTable
    [75] => getKeyName
    [76] => setKeyName
    [77] => getQualifiedKeyName
    [78] => getKeyType
    [79] => setKeyType
    [80] => getIncrementing
    [81] => setIncrementing
    [82] => getKey
    [83] => getQueueableId
    [84] => getQueueableRelations
    [85] => getQueueableConnection
    [86] => getRouteKey
    [87] => getRouteKeyName
    [88] => resolveRouteBinding
    [89] => resolveSoftDeletableRouteBinding
    [90] => resolveChildRouteBinding
    [91] => resolveSoftDeletableChildRouteBinding
    [92] => resolveRouteBindingQuery
    [93] => getForeignKey
    [94] => getPerPage
    [95] => setPerPage
    [96] => preventsLazyLoading
    [97] => broadcastChannelRoute
    [98] => broadcastChannel
    [99] => __get
    [100] => __set
    [101] => offsetExists
    [102] => offsetGet
    [103] => offsetSet
    [104] => offsetUnset
    [105] => __isset
    [106] => __unset
    [107] => __call
    [108] => __callStatic
    [109] => __toString
    [110] => escapeWhenCastingToString
    [111] => __sleep
    [112] => __wakeup
    [113] => attributesToArray
    [114] => relationsToArray
    [115] => getAttribute
    [116] => getAttributeValue
    [117] => getRelationValue
    [118] => isRelation
    [119] => hasGetMutator
    [120] => hasAttributeMutator
    [121] => hasAttributeGetMutator
    [122] => mergeCasts
    [123] => setAttribute
    [124] => hasSetMutator
    [125] => hasAttributeSetMutator
    [126] => fillJsonAttribute
    [127] => fromJson
    [128] => fromEncryptedString
    [129] => encryptUsing
    [130] => fromFloat
    [131] => fromDateTime
    [132] => getDates
    [133] => getDateFormat
    [134] => setDateFormat
    [135] => hasCast
    [136] => getCasts
    [137] => getAttributes
    [138] => setRawAttributes
    [139] => getOriginal
    [140] => getRawOriginal
    [141] => only
    [142] => syncOriginal
    [143] => syncOriginalAttribute
    [144] => syncOriginalAttributes
    [145] => syncChanges
    [146] => isDirty
    [147] => isClean
    [148] => wasChanged
    [149] => getDirty
    [150] => getChanges
    [151] => originalIsEquivalent
    [152] => append
    [153] => setAppends
    [154] => hasAppended
    [155] => getMutatedAttributes
    [156] => cacheMutatedAttributes
    [157] => observe
    [158] => getObservableEvents
    [159] => setObservableEvents
    [160] => addObservableEvents
    [161] => removeObservableEvents
    [162] => retrieved
    [163] => saving
    [164] => saved
    [165] => updating
    [166] => updated
    [167] => creating
    [168] => created
    [169] => replicating
    [170] => deleting
    [171] => deleted
    [172] => flushEventListeners
    [173] => getEventDispatcher
    [174] => setEventDispatcher
    [175] => unsetEventDispatcher
    [176] => withoutEvents
    [177] => addGlobalScope
    [178] => hasGlobalScope
    [179] => getGlobalScope
    [180] => getGlobalScopes
    [181] => resolveRelationUsing
    [182] => hasOne
    [183] => hasOneThrough
    [184] => morphOne
    [185] => belongsTo
    [186] => morphTo
    [187] => getActualClassNameForMorph
    [188] => hasMany
    [189] => hasManyThrough
    [190] => morphMany
    [191] => belongsToMany
    [192] => morphToMany
    [193] => morphedByMany
    [194] => joiningTable
    [195] => joiningTableSegment
    [196] => touches
    [197] => touchOwners
    [198] => getMorphClass
    [199] => getRelations
    [200] => getRelation
    [201] => relationLoaded
    [202] => setRelation
    [203] => unsetRelation
    [204] => setRelations
    [205] => withoutRelations
    [206] => unsetRelations
    [207] => getTouchedRelations
    [208] => setTouchedRelations
    [209] => touch
    [210] => updateTimestamps
    [211] => setCreatedAt
    [212] => setUpdatedAt
    [213] => freshTimestamp
    [214] => freshTimestampString
    [215] => usesTimestamps
    [216] => getCreatedAtColumn
    [217] => getUpdatedAtColumn
    [218] => getQualifiedCreatedAtColumn
    [219] => getQualifiedUpdatedAtColumn
    [220] => getHidden
    [221] => setHidden
    [222] => getVisible
    [223] => setVisible
    [224] => makeVisible
    [225] => makeVisibleIf
    [226] => makeHidden
    [227] => makeHiddenIf
    [228] => getFillable
    [229] => fillable
    [230] => mergeFillable
    [231] => getGuarded
    [232] => guard
    [233] => mergeGuarded
    [234] => unguard
    [235] => reguard
    [236] => isUnguarded
    [237] => unguarded
    [238] => isFillable
    [239] => isGuarded
    [240] => totallyGuarded
    [241] => getAuthIdentifierName
    [242] => getAuthIdentifier
    [243] => getAuthIdentifierForBroadcasting
    [244] => getAuthPassword
    [245] => getRememberToken
    [246] => setRememberToken
    [247] => getRememberTokenName
    [248] => can
    [249] => canAny
    [250] => cant
    [251] => cannot
    [252] => getEmailForPasswordReset
    [253] => sendPasswordResetNotification
    [254] => hasVerifiedEmail
    [255] => markEmailAsVerified
    [256] => sendEmailVerificationNotification
    [257] => getEmailForVerification
    [258] => tokens
    [259] => tokenCan
    [260] => createToken
    [261] => currentAccessToken
    [262] => withAccessToken
    [263] => factory
    [264] => notifications
    [265] => readNotifications
    [266] => unreadNotifications
    [267] => notify
    [268] => notifyNow
    [269] => routeNotificationFor
)
 * */
