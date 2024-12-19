import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
    ],
    templateUrl: './admin.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminComponent {}