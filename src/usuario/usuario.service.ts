import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>
  ) {}

  async listar(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async cadastrar(data: UsuarioCadastrarDto): Promise<ResultadoDto> {
    const usuario = new Usuario();
    usuario.nome = data.nome;
    usuario.email = data.email;
    usuario.password = data.password;
    try {
      await this.usuarioRepository.save(usuario);
      return <ResultadoDto>{
        status: true,
        mensagem: 'Usuário cadastrado com sucesso!',
      };
    } catch (error) {
      return <ResultadoDto>{
        status: false,
        mensagem: 'Erro ao cadastrar o usuaário!',
      };
    }
  }
}
