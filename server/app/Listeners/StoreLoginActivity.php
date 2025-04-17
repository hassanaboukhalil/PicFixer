<?php

namespace App\Listeners;

use App\Events\UserLoggedIn;
use App\Models\LoginActivity;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class StoreLoginActivity
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserLoggedIn $event): void
    {
        LoginActivity::create([
            'user_id' => $event->user->id,
            'ip_address' => $event->ip,
            'latitude' => $event->latitude,
            'longitude' => $event->longitude,
        ]);
    }
}
