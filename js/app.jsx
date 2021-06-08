var app =  app || {};

(function(){
    'use strict';
    
    app.ALL_TODOS = 'all';
    app.ACTIVE_TODOS = 'active';
    app.COMPLETED_TODOS = 'completed';
    var TodoFooter = app.TodoFooter;
    var TodoItem = app.TodoItem;

    var ENTER_KEY = 13;

    var TodoApp = React.createClass({
        getInitialState: function() {
            return {
                nowShowing: app.ALL_TODOS,
                editing: null,
                newTodo: ''
            }
        },

        componentDidMount: function() {
            var setState = this.setState;
            var router = Router({
                '/': setState.bind(this, {nowShowing: app.ALL_TODOS}),
                '/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
                '/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
            });
            router.init('/');
        },

        handleChange: function(event) {
            this.setState({newTodo: event.target.value});
        },

        render: function() {
            var footer;
            var main;
            var todos = this.props.model.todos;

            if (todos.length) {
                main = (
                    <section>
                        <input 
                            id="toggle-all"
                            
                        />
                    </section>
                )
            }
            return(
                <div>
                    <header>
                        <h1>todos</h1>
                        <input
                            className="new-todo"
                            placeholder="What needs to be done?"
                            value={this.state.newTodo}
                            onKeyDown={this.handle.newTodoKeyDown}
                            onChange={this.handleChange}
                            autoFocus={true}
                        />
                    </header>
                    {main}
                    {footer}
                </div>
            )
        }

    });

    var model = new app.TodoModel('react-todos');

    function render() {
        React.render(
            <TodoApp model={model}></TodoApp>,
            document.getElementsByClassName('todoapp')[0]
        );
    }

    model.subscribe(render);
    render();

})();