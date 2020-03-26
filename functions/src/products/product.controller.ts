import {Change} from 'firebase-functions/lib/cloud-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
export interface ProductController {
  updateProduct(change: Change<DocumentSnapshot>, context: EventContext): Promise<any>;
}
