require 'rails_helper'

RSpec.describe 'managing user information', :type => :feature do

  before :each do

  end

  it 'shows all users on the home page' do

    given_the_database_is_empty
    given_there_are_two_users_created_in_the_database

    given_i_am_on_the_home_page
    when_i_view_the_user_display_area
    then_i_should_see_two_users_on_the_page
    then_i_should_see_the_first_name_last_name_and_age_for_each_user
  end

  private

  def given_i_am_on_the_home_page
    visit '/users'
  end

  def when_i_view_the_user_display_area
    user_display = page.find('#users-display')
    expect(user_display).to be_truthy
  end

  def then_i_should_see_two_users_on_the_page
    users = page.find_all('#user')
    expect(users.length).to equal 2
  end

  def then_i_should_see_the_first_name_last_name_and_age_for_each_user
    users = page.find_all('#user')
    first_user = users.first

    expect(first_user.find('#first-name').text).to have_content 'Bob'
    expect(first_user.find('#last-name').text).to have_content 'Loblaw'
    expect(first_user.find('#age').text).to have_content 42
  end

  def given_the_database_is_empty
    User.delete_all
  end

  def given_there_are_two_users_created_in_the_database
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
  end

end