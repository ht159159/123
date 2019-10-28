<script>
export default {
    props: {
        _time: Object
    },
    data() {
        return {
            openHR: false,
            lotterying: false,
            game: {}
        };
    },
    methods: {
        resultcss(number) {
            if (this.$route.name == 'hk6') {
                var red = [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46]
                var blue = [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48]
                var green = [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49]
                var plus = '+';
                var css = 'noneback';

                if (number == plus)
                    css = 'noneback';
                else if (red.indexOf(parseInt(number)) > -1)
                    css = 'redback';
                else if (blue.indexOf(parseInt(number)) > -1)
                    css = 'blueback';
                else if (green.indexOf(parseInt(number)) > -1)
                    css = 'greenback';
                else css = 'yellowback';
                return css;
            } else if (this.$route.name == 'bjkl8') {
                var red = [3, 6, 9, 12, 15, 18, 21, 24]
                var blue = [2, 5, 8, 11, 17, 20, 23, 26]
                var green = [1, 4, 7, 10, 16, 19, 22, 25]
                var gray = [0, 13, 14, 27]

                var css = 'yellowback';
                if (number == '+' || number == '=')
                    css = 'noneback';
                if (red.indexOf(parseInt(number)) > -1)
                    css = 'redback';
                if (blue.indexOf(parseInt(number)) > -1)
                    css = 'blueback';
                if (green.indexOf(parseInt(number)) > -1)
                    css = 'greenback';
                if (gray.indexOf(parseInt(number)) > -1)
                    css = 'greyback';
                return css;
            } else if (this.$route.name == 'pk10') {
                if(isNaN(parseInt(number))){
                    return 'yellowback'
                }
                let aa = number.substr(1);
                let color = parseInt(aa);
                const pk10 = [
                    "PKgreen",
                    "PKyellow",
                    "PKblue",
                    "PKdeepGray",
                    "PKorange",
                    "PKwaterBlue",
                    "PKpurple",
                    "PKgray",
                    "PKred",
                    "PKcoffee"
                ];
                return pk10[color];
            } else {
                return 'yellowback';
            }

        },
        K3img(item) {
            if (isNaN(parseInt(item))) { this.lotterying = true; return; }
            this.lotterying = false;
            return require('@/assets/img/dice' + item + '.png')
        },
    },
    computed: {

    },
    watch: {
        openHR(nv, ov) {
            this.$store.dispatch("backGroundDontTouch", nv);
        },
        '$store.state.panko.result': {
            deep: true,
            handler(nv, ov) {
                this.game = this.$store.state.panko
            }
        }
    }
}
</script>

<template src="./historicalboard.html">
    
</template>

<style src="./historicalboard.css" scoped>

</style>
