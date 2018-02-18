class MembersController < ApplicationController
  before_action :set_member, only: %i[show edit update destroy]

  def new
    @member = Member.new
  end

  def create
    @member = Member.new(member_params)
    render :new unless @member.save
    redirect_to member_path(@member)
  end

  def show; end

  def edit; end

  def update
    render :edit unless @member.update(member_params)
    redirect_to member_path(@member)
  end

  def destroy
    @member.destroy
    redirect_to new_member_path
  end

  private

  def member_params
    params.require(:member).permit!
  end

  def set_member
    @member = Member.find(params[:id])
  end
end
