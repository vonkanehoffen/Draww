class PostsController < ApplicationController
  before_filter :authenticate_user!, except: [:index, :show]
  before_action :set_post, only: [:show, :edit, :update, :destroy, :vote_up, :vote_down]

  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.hot
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    # TODO: How do I fucking use this?
    # respond_to do |format|
    #     format.html { render :layout => !request.xhr? }
    # end
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(post_params)
    @post.user = current_user
    if @post.save
      redirect_to @post, notice: 'Post was successfully created.' 
    else
      render action: 'new'
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    if @post.update(post_params)
      redirect_to @post, notice: 'Post was successfully updated.'
    else
      render action: 'edit'
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post.destroy
    redirect_to posts_url
  end

  def vote_up
    vote = @post.vote_up(current_user)
    if vote.save
      render :json => {vote: => vote, post: => @post}
    else
      render :status => :bad_request, :json => {vote: => vote, post: => @post}
    end
      # redirect_to @post, notice: 'You voted up.'
    # else
    #   redirect_to @post, notice: vote.errors.messages
    # end
  end

  def vote_down
    vote = @post.vote_down(current_user)
    vote.save
    if vote.save
      render :json => {vote: => vote, post: => @post}
    else
      render :status => :bad_request, :json => {vote: => vote, post: => @post}
    end
    # vote = @post.vote_down(current_user)
    # if vote.save
    #   redirect_to @post, notice: 'You voted down.'
    # else
    #   redirect_to @post, notice: vote.errors.messages
    # end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :vote_count, :image)
    end
end
