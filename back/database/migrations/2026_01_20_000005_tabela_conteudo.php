<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('conteudo', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('subtitulo')->nullable();
            $table->string('materia');
            $table->dateTime('publicacao_em')->default(now());
            $table->boolean('publicado')->default(true);
            $table->string('nota')->nullable();
            $table->foreignId('id_secao')->constrained('secao')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('conteudo');
    }
};
