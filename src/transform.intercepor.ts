import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { instanceToPlain } from "class-transformer";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';


@Injectable()
export class TransformInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map((data) => instanceToPlain(data)));
    }
}
// global TransformInterceptor to intercept and modify the response data for every request

/* instanceToPlain() from the class-transformer package is used to convert a class instance (an object created by a  class) into a plain JavaScript object. This transformation strips away class-specific metadata and properties that may not be needed in the output, making the object ready for serialization (for example, to be sent in a JSON response). */