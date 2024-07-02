// extend express Types to add user access token payload to request object
// reference: https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
// Concept of Declaration Merging
import { AccessTokenPayload } from "./auth.type";

declare global {
    namespace Express {
        export interface Request {
            user: AccessTokenPayload;
        }
    }
}
