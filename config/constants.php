<?php

return [
    'permissions' => [
        'VIEW' => 1,
        'CREATE_BIND' => 2,
        'EDIT_BIND' => 4,
        'DELETE_BIND' => 8,
        'PLAY_BIND_ON_SERVER' => 16,
        // 'CREATE_INVITES' => 32,
        // 'DELETE_INVITES' => 64,
        // 'REMOVE_PARTICIPANTS' => 128,
        'ADMIN' => 255 + 256,
    ],
];