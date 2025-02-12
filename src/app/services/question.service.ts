import { inject, Injectable } from "@angular/core";
import { environments } from "../environments/environments";
import { HttpClient } from "@angular/common/http";
import { Question } from "../interfaces/questions.interface";
import { catchError, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class QuestionService {

    private baseUrl: string = environments.baseQuestionsUrl;

    private http = inject(HttpClient);

    getQuestions() {
        return this.http.get<Question[]>(this.baseUrl + '/obtain-questions');
    }

    getQuestionById(id: number) {
        return this.http.get<Question>(this.baseUrl + '/find-question/' + id)
        .pipe(
            catchError(error => of(undefined))
        )
    }

    createQuestion(question: Question) {
        return this.http.post<Question>(this.baseUrl + '/create-question', question);
    }

    updateQuestion(id: number, question: Question) {
        return this.http.patch<Question>(this.baseUrl + '/update-question/' + id, question);
    }

    deleteQuestion(id: number) {
        return this.http.delete(this.baseUrl + '/delete-question/' + id);
    }
}