class User::ParameterSanitizer < Devise::ParameterSanitizer
    private

    def sign_in
      default_params.permit(auth_keys)
    end

    def sign_up
      default_params.permit(auth_keys + [:email, :password, :password_confirmation])
    end

    def account_update
        default_params.permit([:email, :password, :password_confirmation, :current_password])
    end
end