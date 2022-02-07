import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';

@Component({
    selector: 'app-feeds',
    templateUrl: 'feeds.page.html',
    styleUrls: ['feeds.page.scss']
})
export class FeedsPage {
    @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

    statusList = [];
    feedList = [];

    slideOpts = {
        initialSlide: 0,
        speed: 400
    };
    pageNo = 1;
    limit = 5;


    constructor(private apiService: ApiService) {
        this.getAvailableStatus();
        this.getFeeds();
    }

    private async getAvailableStatus() {
        this.apiService.getAvailableStatus(6).then(res => {
            this.statusList = res.results;
        }).catch(err => {
            console.error(err);
        })
    }

    private async getFeeds() {
        const users = await this.apiService.getUsersList(this.pageNo, this.limit);
        users.results.forEach(async (element, index) => {
            const nrOfRandomPics = this.limit % index + 1;
            const pictures = new Array(nrOfRandomPics > 0 ? nrOfRandomPics : 1);
            element['postpictures'] = pictures;
            this.feedList.push(element);
        });
        console.log({ users })
    }

    loadData(event) {
        setTimeout(async () => {
            console.log('Done');
            this.pageNo++;
            await this.getFeeds();
            event.target.complete();

            if (this.feedList.length == 1000) {
                event.target.disabled = true;
            }
        }, 500);
    }
}
