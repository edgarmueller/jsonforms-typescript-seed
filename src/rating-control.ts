
import "jsonforms";
import {AbstractControl, ControlRendererTester} from "jsonforms";
import {IPathResolver} from "jsonforms";

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
  static $inject = ['$scope', 'PathResolver'];
  constructor(scope: ng.IScope, pathResolver: IPathResolver) {
    super(scope, pathResolver);
  }

  property(): Object {
    return this.pathResolver.resolveSchema(this.schema, this.schemaPath);
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
  .run(['RendererService', RendererService => {
  RendererService.register('rating-control', ControlRendererTester('integer', 101))
}])
  .name;
