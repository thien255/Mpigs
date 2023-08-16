using App.Host.ViewModels;
using FluentValidation;

namespace App.Host.Validators
{
    public static class RuleSetName
    {
        
        public const string CreateTenant = "CreateTenant";
        
    }

    public class VerifyCustomerRequestValidator : AbstractValidator<TenantForm>
    {
        public VerifyCustomerRequestValidator()
        {
            CascadeMode = CascadeMode.Stop;
            RuleSet(RuleSetName.CreateTenant, () =>
            {
                RuleFor(x => x.Name) 
                    .MaximumLength(50).WithErrorCode("400").WithMessage("");
              
            });

        }
    }

}
