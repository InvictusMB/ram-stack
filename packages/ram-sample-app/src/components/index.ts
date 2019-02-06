import * as awilix from 'awilix';
import {container} from '../di';
import {Button} from './button';

container.register({
  Button: awilix.asValue(Button),
});
