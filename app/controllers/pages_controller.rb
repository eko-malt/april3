class PagesController < ApplicationController
  def index; end

  def list
    @members = Member.all
  end

  def test
    @member = Member.first ||= Member.new
  end

  def results
    @members = Member.all
  end
end
