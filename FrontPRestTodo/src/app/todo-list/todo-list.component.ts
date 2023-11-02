import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todoList: any[] = [];
  todo: any;
  novoItemNome: string = '';
  itemEditandoId: number | null = null;
  mostrarFormularioAdicao: boolean = false;
  mostrarFormularioEdicao: boolean = false;
  mostrarTabela = false;
  




  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodoList().subscribe((data: any) => {
      this.todoList = data as any[];
    });
  }

  loadTodoList() {
    this.todoService.getTodoList().subscribe((data: any) => {
      this.todoList = data;
    });
  }

  adicionarNovoItem() {
    const novoItem = {
      TodolistaNome: this.novoItemNome,
    };

    this.todoService.addTodoItem(novoItem).subscribe(() => {
      this.novoItemNome = ''; // Limpa o campo de entrada
      this.loadTodoList(); // Atualiza a lista após a adição bem-sucedida
    });
  }

  remover(todoId: number) {
    this.todoService.deleteTodoItem(todoId).subscribe(() => {
      // Após a remoção bem-sucedida, atualize a lista ou faça outras ações necessárias.
      this.todoList = this.todoList.filter((item) => item.TodolistaId !== todoId);
    });
  }

  editar(todo: any) {
    if (this.itemEditandoId === todo.TodolistaId) {
      // Se o botão "Editar" for clicado novamente para o mesmo item, inverta a visibilidade do formulário de edição
      this.mostrarFormularioEdicao = !this.mostrarFormularioEdicao;
    } else {
      this.novoItemNome = todo.TodolistaNome; // Preenche o campo de edição com o nome do item
      this.itemEditandoId = todo.TodolistaId; // Armazena o ID do item que está sendo editado
      this.mostrarFormularioEdicao = true;
    }
  }
  
  toggleTabelaVisibility() {
    this.mostrarTabela = !this.mostrarTabela;
  }
  

  
  salvarEdicao() {
    const itemEditado = {
      TodolistaId: this.itemEditandoId,
      TodolistaNome: this.novoItemNome,
    };
  
    this.todoService.editarTodoItem(itemEditado).subscribe(() => {
      this.novoItemNome = ''; // Limpa o campo de entrada
      this.itemEditandoId = null; // Limpa o ID do item em edição
      this.loadTodoList(); // Atualiza a lista após a edição bem-sucedida
    });
  }
  

}
