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


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RoleTableSeeder::class);
        $this->call(AuthPermissionSeeder::class);

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


        $this->call(H5PPermissionTableSeeder::class);
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
