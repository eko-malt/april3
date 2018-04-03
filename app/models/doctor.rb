class Doctor < ApplicationRecord
  validates_uniqueness_of :phone, message: I18n.t('form.phone_already_taken')
  validates_presence_of :first_name, :phone, :city, :spec, message: I18n.t('form.cant_be_blank')
  validate :check_count

  
end
