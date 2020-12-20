import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ColorService } from '../Shared/Services/color.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('divCircle', [

      state('top-left', style({
        backgroundColor: '{{ball_color}}',
        transform: 'translateX(0)'
      })
      ,{params: {ball_color: '#a78b67'}}
      ),
      state('top-right', style({
        backgroundColor: '{{ball_color}}',
        transform: 'translateX(346px)'
      }),
      {
        params: {ball_color: '#a78b67'}
      }),
      state('bottom-right', style({
        backgroundColor:'{{ball_color}}',
        transform: 'translateY(146px) translateX(346px)'
      }),
      {
        params: {ball_color: '#a78b67'}
      }),
      state('bottom-left', style({
        backgroundColor:'{{ball_color}}',
        transform: 'translateY(146px)'
      }),
      {
        params: {ball_color: '#a78b67'}
      }),
      state('null', style({ //null state is used on startup
        backgroundColor:'{{ball_color}}',
        transform: 'translateX(0)'
      }),
      {
        params: {ball_color: '#a78b67'}
      }),
      transition('* => *', animate(300))
    ]
      
    )
  ]
})
export class HomeComponent implements OnInit {

  constructor(
    private colorService: ColorService
  ) { }

    ball_color = '#000000';
    state = 'null';
    allEventsObserve : Observable<Array<any>>;

  ngOnInit(): void {
    this.callColor();
  }

  stateHandler() {
    // method for switching between animation states
    switch(this.state){
      case 'null':
        this.state = 'top-left';
        break;
      case 'top-left':
        this.state = 'top-right';
        break;
      case 'top-right':
        this.state = 'bottom-right';
        break;
      case 'bottom-right':
        this.state = 'bottom-left';
        break;
      case 'bottom-left':
        this.state = 'top-left';
        break;
    }
  }

  callColor(){

    this.allEventsObserve = new Observable; // setting the allEventsObserve to a new Observable everytime.

    this.allEventsObserve = this.colorService.getColors();
    
    this.allEventsObserve.pipe(
      finalize(() => 
        this.stateHandler() // when the request is finished the state handler method is called.
      ),
    ).subscribe(
       res => {
        console.log(res)
        // Had to add ts-ignore becuase angular doesnt know what res.new_color is even though it is valid.
        //@ts-ignore 
        this.ball_color = "#"+res.new_color; // since the api returns the hex value we have to manually append the #.
       }
    );
  }
}
