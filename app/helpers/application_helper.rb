module ApplicationHelper

  def bodytag_id
    a = controller.class.to_s.underscore.gsub(/_controller$/, '')
    b = controller.action_name.underscore
    "#{a}-#{b}".gsub(/_/, '-')
  end

end
