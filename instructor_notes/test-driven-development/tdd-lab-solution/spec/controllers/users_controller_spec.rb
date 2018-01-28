require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  render_views

  before :each do

    User.delete_all

    User.create!(
        first_name: 'Bob',
        last_name: 'Loblaw',
        age: 42
    )

    User.create!(
        first_name: 'Tobias',
        last_name: 'Funke',
        age: 37
    )

    get :index
  end

  describe 'GET #index' do
    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end

    it 'renders the user display block' do
      expect(response.body).to have_content 'Here are the Users'
    end

    it 'renders each user in the database' do
      expect(response.body).to have_content 'Bob'
      expect(response.body).to have_content 'Tobias'
    end
  end

end
