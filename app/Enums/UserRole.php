<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class UserRole extends Enum
{
    const Admin = 'admin';
    const Member = 'member';
}