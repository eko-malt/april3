class Member < ApplicationRecord
  validates_uniqueness_of :phone, message: I18n.t('form.phone_already_taken')
  validates_presence_of :first_name, :second_name, :company, :position, :phone, :address, :area, :manager, message: I18n.t('form.cant_be_blank')
end
