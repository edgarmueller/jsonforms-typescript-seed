import "angular";
import "jsonforms";
import "./rating-control.ts";

import "bootstrap/dist/css/bootstrap.css";
import "angular-ui-bootstrap";
import 'angular-ui-bootstrap/src/rating';

class RatingController {
  data = {
    'rating': 2
  };
  schema = {
    "type": "object",
    "properties": {
      "rating": {
        "type": "integer",
        "maximum": 5
      },
      "comment": {
        "type": "string",
        "minLength": 3
      }
    }
  };
}

angular.module("app", ["jsonforms", "my", "ui.bootstrap.module.rating"])
  .controller("RatingController", RatingController);
angular.bootstrap(document, ["app"], {
  strictDi: true
});
