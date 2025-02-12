import { inject, Inject } from "@angular/core";
import { environments } from "../environments/environments";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pdfs } from "../interfaces/pdfs.interface";

@Inject({
    providedIn : 'root'
})

export class PdfService {
    
    private baseUrl: string = environments.basePdfsUrl;

    private http = inject(HttpClient);

    getPdfs(): Observable<Pdfs[]> {
        return this.http.get<Pdfs[]>(this.baseUrl + '/obtain-pdfs');
    }

    getPdfById(id: number) {
        return this.http.get(this.baseUrl + '/find-pdf/' + id);
    }

    createPdf(pdf: Pdfs) {
        return this.http.post<Pdfs>(this.baseUrl + '/create-pdf', pdf);
    }

    updatePdf(id: number, pdf: Pdfs) {
        return this.http.patch<Pdfs>(this.baseUrl + '/update-pdf/' + id, pdf);
    }

    deletePdf(id: number) {
        return this.http.delete(this.baseUrl + '/delete-pdf/' + id);
    }

}