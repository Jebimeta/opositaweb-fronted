import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Test } from "../interfaces/tests.interface";

@Injectable({
    providedIn: 'root'
})

export class TestService{

    private baseUrl: string = 'http://localhost:3000/tests';

    private http = inject(HttpClient);

    gestTests(): Observable<Test[]>{
        return this.http.get<Test[]>(this.baseUrl + '/obtain-tests');
    }

    getTestById(id: number){
        return this.http.get<Test>(this.baseUrl + '/find-test/' + id);
    }

    createTest(test: Test){
        return this.http.post<Test>(this.baseUrl + '/create-test', test);
    }

    updateTest(id: number, test: Test){
        return this.http.patch<Test>(this.baseUrl + '/update-test/' + id, test);
    }

    deleteTest(id: number){
        return this.http.delete(this.baseUrl + '/delete-test/' + id);
    }

}