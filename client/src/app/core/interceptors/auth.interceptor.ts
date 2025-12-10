import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function credentialsInterceptor(
	request: HttpRequest<unknown>,
	next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
	const newRequest = request.clone({
		withCredentials: true,
	});
	return next(newRequest);
}
