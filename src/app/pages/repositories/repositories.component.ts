import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { FormsModule } from '@angular/forms';
import { CardsComponent } from '../../shared/components/cards/cards.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RepositoryService } from '../../../services/repository.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  language: string;
  stargazers_count: number;
  private: boolean;
  login: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
    url: string;
    id: number;
  };
  html_url: string;
  created_at: any;
}

@Component({
  selector: 'dev-avonale-repositories',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    FormsModule,
    CardsComponent,
    NgFor,
    NgIf,
  ],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
})
export class RepositoriesComponent implements OnInit {
  @ViewChild('modalUser') modalUser!: ElementRef<HTMLDialogElement>;
  repositories: Repository[] = [];
  totalPages: number = 5;
  currentPage: number = 1;
  filteredRepositories: any[] = [];
  searchTerm: string = '';
  selectedUser: any = null;
  searchSubject = new Subject<string>();

  constructor(private repositoryService: RepositoryService) {}

  ngOnInit(): void {
    this.loadRepositories();
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => this.filterRepositories(term));
  }

  loadRepositories(): void {
    this.repositoryService.getRepositories(1).subscribe(
      (repos) => {
        this.repositories = repos.map((repo: Repository) => ({
          ...repo,
          created_at: repo.created_at ? new Date(repo.created_at) : null,
          stars: repo.stargazers_count,
        }));
        this.filteredRepositories = [...this.repositories];
      },
      (error) => {
        console.error('❌ Erro ao carregar repositórios:', error);
      }
    );
  }

  filterRepositories(searchTerm: string) {
    this.searchTerm = searchTerm.trim().toLowerCase();

    if (!this.searchTerm) {
      this.filteredRepositories = [...this.repositories];
      return;
    }

    this.filteredRepositories = this.repositories.filter((repo) =>
      repo.full_name.toLowerCase().includes(this.searchTerm)
    );
  }

  onSearchChange(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }

  openUserModal(user: any) {
    this.selectedUser = user;
    if (this.selectedUser) {
      setTimeout(() => {
        this.modalUser?.nativeElement.showModal();
      });
    } else {
      console.error('Erro: Usuário inválido ao abrir o modal.');
    }
  }

  closeModal() {
    this.modalUser?.nativeElement.close();
    this.selectedUser = null;
  }
}
