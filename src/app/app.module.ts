import { CommentComponent } from './components/comment/comment.component';
import { VotingComponent } from './components/voting/voting.component';
import { CardComponent } from './components/card/card.component';
import { ChangePasswordComponent } from './components/changePassword/changepassword.component';
import { EditUserComponent } from './components/edituser/editUser.component';
import { ErrComponent } from './components/error/err.component';
import { ArticleComponent } from './components/article/article.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreatePostComponent } from './components/createpost/createPost.component';
import { FeedComponent } from './components/feed/feed.component';
import { SummaryPipe } from './util/pipes';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserComponent } from './components/user/user.component';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing.module';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { TagInputComponent } from './components/tags/tag-input.component';
import { TagInputItemComponent } from './components/tags/tag-input-item.component';
import { ConnectedUserComponent } from './components/connecteduser/connecteduser.component';
import { TermsComponent } from './components/terms/terms.component';
import { RelatedComponent } from './components/related/related.component';
import { UserWaysComponent } from './components/userways/userways.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ReportComponent } from './components/report/report.component';
import { FileUploaderComponent } from './components/fileuploader/fileuploader';
import { PasswordResetComponent } from './components/passwordreset/passwordreset';
import { WavesComponent } from './components/waves/waves.component';
import { WavesPrevComponent } from './components/waves/wavesprev.component';
import { CreateWaveComponent } from './components/waves/createwave.component';
import { WaveControllerComponent } from './components/waves/wavecontroller.component';
import { WaveControllerItem } from './components/waves/wavecontroller.item';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { InterestsComponent } from './components/interest/interest.component';
import { LanguageChanger } from './components/languagechanger/languagechanger';
import { EditorComponent } from './components/editor/editor.component';
import { ShareButtonsModule } from 'ng2-sharebuttons';
import { InterestItem } from './components/interest/interest.item';
import { LoginByToken } from './components/loginbytoken/loginbytoken';
import { AutocompleteComponent } from './components/auto';
import { MaterializeDirective } from 'angular2-materialize';
import { UserService } from './util/services/user.service';
import { PostService } from './util/services/post.service';
import { WaveService } from './util/services/wave.service';
import { CommentService } from './util/services/comment.service';
import { LanguageService } from './util/services/language.service';
import { NavbarService } from './util/services/navbar.service';
import { MediaService } from './util/services/media.service';
import { ReportService } from './util/services/report.service';
import { TagSearchComponent } from './components/search/tagsearch.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { TagService } from './util/services/tag.service';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { Ng2ParallaxScrollModule } from 'ng2-parallax-scroll'
import { ParallaxDirective } from './directives/parallax.directive';
import { InitResolver } from './util/services/InitReslover.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    InfiniteScrollModule,
    ShareButtonsModule,
    Ng2CompleterModule,
  ],
  declarations: [
    AppComponent,
    EditorComponent,
    CreatePostComponent,
    LoginComponent,
    FeedComponent,
    SignupComponent,
    NavbarComponent,
    ProfileComponent,
    UserComponent,
    ArticleComponent,
    ErrComponent,
    EditUserComponent,
    ChangePasswordComponent,
    CardComponent,
    VotingComponent,
    TagInputComponent,
    TagInputItemComponent,
    PasswordResetComponent,
    TermsComponent,
    CommentComponent,
    RelatedComponent,
    AutocompleteComponent,
    BookmarkComponent,
    UserWaysComponent,
    ConfirmComponent,
    MaterializeDirective,
    SummaryPipe,
    LoadingComponent,
    ConnectedUserComponent,
    LoginByToken,
    FileUploaderComponent,
    PasswordResetComponent,
    ReportComponent,
    InterestsComponent,
    InterestItem,
    LanguageChanger,
    WavesComponent,
    WavesPrevComponent,
    CreateWaveComponent,
    WaveControllerComponent,
    WaveControllerItem,
    TagSearchComponent,
    ImageCropperComponent,
    ParallaxDirective
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    InitResolver,
    UserService,
    PostService,
    CommentService,
    LanguageService,
    NavbarService,
    MediaService,
    ReportService,
    WaveService,
    TagService
  ]
})
export class AppModule { }