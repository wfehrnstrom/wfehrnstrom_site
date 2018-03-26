// Class definition
class Blog{
  _colorScheme(){
    // pseudo static variable mapping a post type to a color
    return new Map([['personal', '#b3edff'], ['how-to','#ffb3b3'], ['review', '#b3ffb3'], ['poetry', '#ff9900']]);
  }

  _iconDir(){
    // pseudo static variable that returns the directory where icons are
    return './';
  }


  _hookSignature(){
    // pseudo static variable that returns the character sequence denoting a hook object
    return '~~';
  }

  // returns pseudorandom id that is a unique tag for this blog, using the library hashids
  id(){
    if(!this.uniqueID){
      var hashids = new Hashids(this.body.substring(0, this.body.length));
      this.uniqueID = hashids.encode([Math.floor(Math.random() * Math.floor(1000))]);
    }
    return this.uniqueID;
  }

  constructor(body, date, type, number, collaborators=['Will Fehrnstrom'], title="Untitled", quote=""){
    this.title = title;
    this.date = date;
    this.collaborators = collaborators;
    this.number = number;
    this.body = body;
    this.type = type;
    this.quote = quote;
    this.images = [];
  }

  description(){
    if(!this.description){
      // return the first 200 characters of the body or the entire body, whichever is shorter
      this.description = ((this.body.length > 200) ? this.body.substring(0, 200) : this.body.substring(0, this.body.length));
    }
    return this.description;
  }

  date(){
    return this.date;
  }

  title(){
    return this.title;
  }

  body(){
    // parseBody
  }

  quote(){
    return this.quote
  }

  monthPublished(){
    var monthsInYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthsInYear[this.date.getMonth()];
  }

  collaborators(){
    return this.collaborators;
  }

  addImage(imageLink){

  }

  determineColorScheme(){
    return this._colorScheme().get(this.type);
  }

  display(){

  }

  hide(){

  }

  minimize(){

  }

  _insert(text, newText, lastTag){
    var index = text.indexOf(lastTag);
    if(index !== -1){
      return text.slice(0, index) + newText + text.slice(index, text.length);
    }
    return '';
  }

  _padNum(num){
    return (num < 10) ? ("0" + num) : num;
  }

  _composeHeader(parentDoc){
    var header = parentDoc.createElement('div');
    header.className = 'blog-header';
    var headerLeft = parentDoc.createElement('div');
    headerLeft.className = 'blog-header-left';
    // create children of header left
    // title
    var title = parentDoc.createElement('div');
    title.className = 'blog-title text';
    var titleText = parentDoc.createTextNode(this.title);
    title.appendChild(titleText);
    // date
    var dateElement = parentDoc.createElement('div');
    dateElement.className = 'blog-date text';
    var dateText = parentDoc.createTextNode(this.date.toDateString());
    dateElement.appendChild(dateText);
    // append children of header left
    headerLeft.appendChild(title);
    headerLeft.appendChild(dateElement);
    // create other elements of header
    // header divider
    var headerDivider = parentDoc.createElement('div');
    headerDivider.className = 'blog-header-divider';
    // blog number
    var blogNumber = parentDoc.createElement('div');
    blogNumber.className = 'blog-number text';
    var num = parentDoc.createTextNode(this._padNum(this.number));
    blogNumber.appendChild(num);
    // share buttons
    var twitterLogo = new Logo('blog-share-twitter', '../../res/logos/blog_share_twitter.svg', ['opacity-immutable', 'share-button']);
    var facebookLogo = new Logo('blog-share-facebook', '../../res/logos/blog_share_facebook.png', ['opacity-immutable', 'share-button']);
    var shareButtonTwitter = twitterLogo.compose(parentDoc);
    var shareButtonFacebook = facebookLogo.compose(parentDoc);
    // blog-aux
    var blogAux = parentDoc.createElement('div');
    blogAux.className = 'blog-aux';
    var shareLogo = new Logo('icon', '../../res/logos/blog_share_icon.svg', ['blog-share-button']);
    var shareButton = shareLogo.compose(parentDoc);
    blogAux.appendChild(shareButton);
    // append these elements
    header.append(headerLeft);
    header.append(headerDivider);
    header.append(blogNumber);
    header.append(shareButtonTwitter);
    header.append(shareButtonFacebook);
    header.append(blogAux);
    return header;
  }

  _numHooks(text = this.body){
    var index = 0;
    var count = 0;
    while(index !== -1){
      index = this.body.indexOf(this._hookSignature(), index + 1);
      count++;
    }
    if(count % 2 == 1){
      count--;
    }
    return count;
  }

  _hookPresent(text = this.body){
    if(this._numHooks(text) > 0){
      return true;
    }
    return false;
  }

  _imageFromHook(hook, body = this.body){

  }

  _parseHook(hook){

  }

  _translateText(text, bodyElement){
    while(_hookPresent(body)){
      var startHookPosition = body.indexOf(this._hookSignature());
      var endHookPosition = body.indexOf(this._hookSignature(), startHookPosition + 1)
      hook = body.substring(startHookPosition + this._hookSignature().length, endHookPosition);
      this._parseHook(hook);
      body = body.substring(endHookPosition + this._hookSignature().length, body.length);
    }
  }

  _composeBody(parentDoc){
    var blogBody = parentDoc.createElement('div')
    blogBody.className = 'blog-writing text';
    var blogWriting = parentDoc.createTextNode(this.body);
    blogBody.appendChild(blogWriting);
    return blogBody;
  }

  compose(parentDoc){
    if(!this.blog){
      this.blog = parentDoc.createElement('article');
      // create blog article node
      this.blog.className = 'post';
      this.blog.id = this.id();
      this.blog.dataset.blogType = this.type;
      // create color banner node
      var colorBanner = parentDoc.createElement('div');
      colorBanner.className = 'color-banner';
      colorBanner.style.backgroundColor = this.determineColorScheme();
      // create blog header
      var header = this._composeHeader(parentDoc);
      // create blog body
      var body = this._composeBody(parentDoc);
      this.blog.appendChild(colorBanner);
      this.blog.appendChild(header);
      this.blog.appendChild(body);
    }
    // return blog element
    return this.blog;
  }
}

class Project{
  constructor(title, startDate, string){

  }

  description(){

  }

  date(){

  }

  title(){

  }

  body(){

  }

  collaborators(){

  }

  timeActive(){

  }

  isActive(){

  }

  addImage(im){

  }

  finishedOn(date){

  }

  display(){

  }
}
