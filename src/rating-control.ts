
import "jsonforms";
import {AbstractControl, Testers, schemaTypeIs, schemaPropertyName, PathResolver} from "jsonforms";

class RatingControlDirective implements ng.IDirective {

  public static DEFAULT_MAXIMUM: number = 5;

  template = `
    <jsonforms-control>
      <uib-rating
        id="{{vm.id}}"
        readonly="vm.uiSchema.readOnly"
        ng-model="vm.modelValue[vm.fragment]"
        max="vm.max()"></uib-rating>
      </uib-rating>
    </jsonforms-control>`;
  controller = RatingControl;
  controllerAs = 'vm';
}


class RatingControl extends AbstractControl {
  static $inject = ['$scope'];
  constructor(scope: ng.IScope) {
    super(scope);
  }

  property(): Object {
    return PathResolver.resolveSchema(this.schema, this.schemaPath);
  }

  max(): number {
    if (this.property()['maximum'] !== undefined) {
      return <number>this.property()['maximum'];
    } else {
      return RatingControlDirective.DEFAULT_MAXIMUM;
    }
  }
}


export default angular
  .module('my', ['jsonforms.renderers.controls'])
  .directive('ratingControl', () => new RatingControlDirective())
  .run(['RendererService', RendererService =>
  RendererService.register('rating-control',
    Testers.and(
      schemaTypeIs('integer'),
      schemaPropertyName('rating')
      ), 101)
]).name;
