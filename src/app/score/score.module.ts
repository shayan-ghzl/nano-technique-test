import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScorePageRoutingModule } from './score-routing.module';

import { ScorePage } from './score.page';
import { StarRatingComponent } from '../shared/components/star-rating/star-rating.component';
import { SegmentComponent } from '../shared/components/segment/segment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScorePageRoutingModule
  ],
  declarations: [ScorePage, StarRatingComponent, SegmentComponent]
})
export class ScorePageModule {}
