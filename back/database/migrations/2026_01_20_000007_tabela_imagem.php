<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('imagem', function (Blueprint $table) {
            $table->id();
            $table->string('url')->nullable();
            $table->string('caminho')->nullable();
            $table->string('descricao')->nullable();
            $table->string('extensao')->default('jpg');
            $table->foreignId('id_noticia')->nullable()->constrained('noticia')->nullOnDelete();
            $table->foreignId('id_evento')->nullable()->constrained('evento')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('imagem');
    }
};
