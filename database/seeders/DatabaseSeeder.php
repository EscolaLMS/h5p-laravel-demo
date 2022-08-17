<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use EscolaLms\HeadlessH5P\Database\Seeders\PermissionTableSeeder as H5PPermissionTableSeeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use EscolaLms\Core\Seeders\RoleTableSeeder;
use EscolaLms\Auth\Database\Seeders\AuthPermissionSeeder;
use EscolaLms\Settings\Database\Seeders\PermissionTableSeeder as SettingsPermissionTableSeeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // permissions are required 
        $this->permissions();

        // roles
        $admin = Role::findOrCreate('admin', 'api');
        $student = Role::findOrCreate('student', 'api');

        // users
        $student = User::firstOrCreate([
            'first_name' => 'Osman',
            'last_name' => 'Kanu',
            'email' => 'student@escolalms.com'
        ], [
            'password' => bcrypt('secret'),
            'is_active' => 1,
            'email_verified_at' => Carbon::now(),
        ]);
        $student->guard_name = 'api';
        $student->assignRole('student');

        $admin = User::firstOrCreate([
            'first_name' => 'Admin',
            'last_name' => 'A',
            'email' => 'admin@escolalms.com',
        ], [
            'password' => bcrypt('secret'),
            'is_active' => 1,
            'email_verified_at' => Carbon::now(),
        ]);

        $admin->guard_name = 'api';
        $admin->assignRole('admin');
    }

    private function permissions()
    {
        $this->call(RoleTableSeeder::class);
        $this->call(AuthPermissionSeeder::class);
        $this->call(H5PPermissionTableSeeder::class);
        $this->call(SettingsPermissionTableSeeder::class);
    }
}
