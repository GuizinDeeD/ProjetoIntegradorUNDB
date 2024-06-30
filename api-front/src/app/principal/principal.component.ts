import { Component } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  cliente = new Cliente();
  tabela:boolean = true;
  btnCadastro:boolean =true;

  // JSON dos clientes
  clientes:Cliente[] = [];

  constructor(private servico:ClienteService){}

  //método seleciona cliente
  selecionar():void{
    this.servico.selecionar()
    .subscribe(retorno => this.clientes = retorno);

  }

  //Cadastro
  cadastrar():void{
    this.servico.cadastrar(this.cliente)
    .subscribe(retorno => {
      //cadastra cliente no vetor
      this.clientes.push(retorno);
      //Limpar fomrulario
      this.cliente = new Cliente();
      alert('Paciente vacinado e registrado com sucesso');
    
    });
  }

  //metodo para selecionar um cliente especifico
  selecionarCliente(posicao:number):void{
    //Seleciona paciente no vetor
    this.cliente = this.clientes[posicao];
    //visibibilidade dos botões
    this.btnCadastro=false;
    this.tabela = false;
  }


  editar():void{
    this.servico.editar(this.cliente)
    .subscribe(retorno=>{
      //Obter posição do vetor
      let posicao = this.clientes.findIndex(obj=>{
        return obj.codigo == retorno.codigo;
      });
      this.clientes[posicao] = retorno;
    });
    this.cliente = new Cliente();
    this.btnCadastro = true;
    this.tabela = true;
    alert('Cadastro do paciente alterado com sucesso!');
  }
    
  cancelar():void{

    this.cliente = new Cliente();

    this.btnCadastro = true;

    this.tabela = true;
  }


  remover():void{
    this.servico.remover(this.cliente.codigo)
    .subscribe(retorno=>{
      //Obter posição do vetor
      let posicao = this.clientes.findIndex(obj=>{
        return obj.codigo == this.cliente.codigo;
      });
      this.clientes.splice(posicao, 1);
    });
    this.cliente = new Cliente();
    this.btnCadastro = true;
    this.tabela = true;
    alert('Cadastro removido com sucesso!');
  }






  //Inicialização
  ngOnInit(){
    this.selecionar();
  }
}
