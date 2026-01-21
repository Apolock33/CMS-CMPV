<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pagina', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('descricao')->unique();
            $table->string('nivel_acesso');
            $table->string('status')->default('ativo');
            $table->foreignId('id_template')->constrained('template')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pagina');
    }
};
