import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UploadimageService {
  formdata: FormData = new FormData();

  constructor(private http: HttpClient) {}

  pushFileToStorage(file: File, id): Observable<HttpEvent<{}>> {

    this.formdata.append('file', file);

    const req = new HttpRequest('POST', 'http://localhost:8080/api/img?id=' + id, this.formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }


}
