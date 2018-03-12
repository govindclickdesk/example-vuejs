/**
 * Form Component.
 * Displays all possible input elements for user input.
 * Validates the form with the given rules.  
 * Serializes the form and send the data to configured URL.
 * Handles the server callback functions(Success, Error callbacks).
 */
Vue.component('example_form', {
    template: $('.example-form-wrapper').parent().html(),
    props: ['config', 'url', 'schema_url', 'title', 'schema'],
    mixins: [form_mixin],
    data: function () {
        return {
            loading: false,
            model: {},
            inputs: [],
            status: {
                type: "error",
                message: ""
            }
        }
    },

    created() {

        // Change config from props data
        var self = this;
        if (this.url) {
            self.config.api_url = this.url
        }

        if (!this.config.inputs)
            this.config.inputs = [];

        // If schema as object
        if (this.schema) {
            // Process meta info
            self.process_form_inputs(this.schema);
        }

    },

    computed: {

    },

    watch: {

    },

    mounted() {

        // If URL is defined, read from url
        var self = this, data = self.config.data;

        // Get data from server URL
        if (data && data.url) {
        }
    },

    methods: {

        // Gets form name from config
        get_form_name() {
            console.log("get_form_name");
            var name = this.config.name;
            if (!name)
                name = this.config.title;
            if (!name)
                name = "Generic Form " + (this.form_name_index++);

            return name.toLowerCase().replace(/ /g, '_');
        },

        // Process the meta info for form input fields
        process_meta_info: function (data) {
            console.log("form process_meta_info", data);

            // Convert to component field key format
            this.inputs = this.sort__by_property(data, "FIELD_POSITION");
            this.config.inputs = this.inputs;
        },

        // On submit
        submit_form: function (event) {
            var self = this;

            // Validate multiple forms
            if (!this.is_valid_form(this.config.name))
                return;

            // Serialiaze the data
            var json = this.serialize_table_form(this.config.name);
            console.log("model state", JSON.stringify(json));

            // Start loader

            // Parse URL with path params
            var post_url = this.parse_url_params(this.config.api_url, this.$route.params);
            appup_http.post(post_url, json, function (data) {
                console.log("success", data);

                // Success handler
                self.submit_success();
            }, function (error) {

                // Error handler
                self.submit_error();
            }, this.config);

        },

        // Success
        submit_success: function (data) {

        },

        // Error callback
        submit_error: function (error) {

        },

        // User actions
        execute_form_action: function (action, data) {
            if (!action)
                return;

            // Show modal

            // Navigate to URL
            if (action.navigate) {
                // Action 

                return;
            }

            // Page refresh
            if (action.page_reload) {
                location.reload();
            }

            // Location change
            if (action.change_location) {
                window.location = action.change_location;
            }
        }
    }
})

