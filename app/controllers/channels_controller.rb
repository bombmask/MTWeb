class ChannelsController < ApplicationController


  def index

  end

  def show
      @name = params[:name]
    #   <h1>@name</h1>
  end
end
