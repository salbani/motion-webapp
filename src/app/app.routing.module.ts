import { EditUserComponent } from './components/edituser/editUser.component';
import { ChangePasswordComponent } from './components/changePassword/changepassword.component';
import { ErrComponent } from './components/error/err.component';
import { ArticleComponent } from './components/article/article.component';
import { FeedComponent } from './components/feed/feed.component';
import { CreatePostComponent } from './components/createpost/createPost.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PasswordResetComponent } from './components/passwordreset/passwordreset';
import { TermsComponent } from './components/terms/terms.component';
import { ConnectedUserComponent } from './components/connecteduser/connecteduser.component';
import { LoginByToken } from './components/loginbytoken/loginbytoken';
import { WavesComponent } from './components/waves/waves.component';
import { CreateWaveComponent } from './components/waves/createwave.component';
import { InitResolver } from './util/services/InitReslover.service';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: {
      init: InitResolver
    }
  },

  {
    path: 'profile/:id',
    component: ProfileComponent,
    resolve: {
      init: InitResolver
    }
  },

  {
    path: '',
    component: LoginComponent,
    resolve: {
      init: InitResolver
    }
  },

  {
    path: 'createpost/:id',
    component: CreatePostComponent,
    resolve: {
      init: InitResolver
    }
  },

  {
    path: 'login',
    component: LoginComponent,
    resolve: {
      init: InitResolver
    }
  },

  {
    path: 'signup',
    component: SignupComponent,
    resolve: {
      init: InitResolver
    }
  },

  {
    path: 'posts',
    component: FeedComponent,
    resolve: {
      init: InitResolver
    }
  },

  {
    path: 'createpost',
    component: CreatePostComponent,
    resolve: {
      init: InitResolver
    }
  },

  {
    path: 'article/:id/:name',
    component: ArticleComponent,
    resolve: {
      init: InitResolver
    }
  },
  {
    path: 'article/:id',
    component: ArticleComponent,
    resolve: {
      init: InitResolver
    }
  },

  {
    path: 'err/:message',
    component: ErrComponent,
    resolve: {
      init: InitResolver
    }
  },

  {
    path: 'edituser',
    component: EditUserComponent,
    resolve: {
      init: InitResolver
    }
  },

  {
    path: 'changepassword',
    component: ChangePasswordComponent,
    resolve: {
      init: InitResolver
    }
  },
  {
    path: 'lostpass',
    component: PasswordResetComponent,
    resolve: {
      init: InitResolver
    }
  },

  {
    path: 'terms',
    component: TermsComponent,
    resolve: {
      init: InitResolver
    }
  },
  {
    path: 'connections',
    component: ConnectedUserComponent,
    resolve: {
      init: InitResolver
    }
  },
  {
    path: 'loginbytoken/:token',
    component: LoginByToken,
    resolve: {
      init: InitResolver
    }
  },
  {
    path: 'newpassword/:token',
    component: PasswordResetComponent,
    resolve: {
      init: InitResolver
    }
  },
  {
    path: 'waves/:id',
    component: WavesComponent,
    resolve: {
      init: InitResolver
    }
  },
  {
    path: 'waves',
    component: WavesComponent,
    resolve: {
      init: InitResolver
    }
  },
  {
    path: 'createwave',
    component: CreateWaveComponent,
    resolve: {
      init: InitResolver
    }
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }