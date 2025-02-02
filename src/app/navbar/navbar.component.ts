import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };
  imglogo = "er.png"
  navigation: any[] = [];
  userNavigation: any[] = [];

  constructor(private router: Router, private share: UserServiceService) {
    this.updateNavigation();
  }
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveLinks();
      }
    });

    // Subscribe to authentication changes
    
  }

  private updateNavigation() {
    console.log(this.share.isloggedIn)
    if (this.share.isloggedIn) {
      this.navigation = [
        { name: 'Home', href: '/', current: this.router.url === '/' }
      ];
      this.userNavigation = [
        { name: 'Your Profile', href: '#' },
        { name: 'Settings', href: '#' },
        { 
          name: 'Sign out', 
          href: '#',
          action: (event: Event) => {
            event.preventDefault();
            this.logout();
          }
        },
      ];
    } else {
      this.navigation = [
        { name: 'Login', href: '/Login', current: this.router.url === '/login' },
        { name: 'Register', href: '/register', current: this.router.url === '/register' },
      ];
      this.userNavigation = [];
    }
  }

  private updateActiveLinks() {
    this.navigation.forEach(item => {
      item.current = item.href === this.router.url;
    });
  }
  
  logout() {
    this.share.isloggedIn = false;
    this.router.navigate(['/logout']);
    this.updateNavigation()
  }
}