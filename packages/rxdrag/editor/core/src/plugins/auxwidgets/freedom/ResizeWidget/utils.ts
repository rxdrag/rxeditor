export const HandlerSize = 6

export function svgCursor(svgIcon: string, defaultCursor: string) {
  const iconUrl = 'data:image/svg+xml;base64,'
    + window.btoa(decodeURIComponent(svgIcon))

  const rotateCursor = `
  url('${iconUrl}') 16 16, ${defaultCursor}
  `
  return rotateCursor
}

export const leftBottomTopRightCursor = `
<svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="64" height="64" fill="url(#pattern0)"/>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_121_45" transform="scale(0.015625)"/>
</pattern>
<image id="image0_121_45" width="64" height="64" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
`

export const leftTopBottomRightCursor = `
<svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="64" height="64" fill="url(#pattern0)"/>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_121_47" transform="scale(0.015625)"/>
</pattern>
<image id="image0_121_47" width="64" height="64" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAG7UlEQVR4Xu2afUwTdxjHn5MdDGYRer7wOjZwCzJpB8ves/2Bi0ukZsnmXzNMXjNdjFmM08aMaPbWEaMbyVAjUjNDQvxXiYlZyRLd+zKRNrgxs6KlHfjSMgZsA2lZvpd7yKWjCFfrweglTa/tXe+ez+95vs9LK9Ai34RFbj/FAcQ9YJETiIfAIneAuAjGQyAeAoucQDwEonQAAGSIkWBOKtfAM+9Hedm7d7pWD8B5S4goQXnm17gz9Xey0XgOEVFQecb+vNi0AMA5MPy+4eHhelEUX2SjJycn//N9giDIEBISEiZFUXyZiCZUIHSHoAWAbDwRJfn9/neNRuM7s7VCEAQjEY0R0bgCQfeQmCsAHA/jE4koxePx7M3NzX27ra3t1+3btwvhHsCr7/f7H5VjQxCyiWiUiP4hottKOMyWX0yO0wJAJKJkIlp65cqVvatXr36rtbX1t4qKioLp7tBoNLr9fn++AgDH/ElEfykQdNcCLQCSsPpElNrd3W0tKip6s7W1tbeiouJhBrBhw4ZfFINl8Wtvb39MeV1ERINENEJEfythEJOVne2XagWwlIiWuVwu69q1a2tPnjx5bcuWLXnp6enewcHBHFx83759vfv375+CogAwEVFA8QIAgCDqus0VAFIfPAAA0rq6uvaYTKYaFQCfwWC47fF4HoJVdXV1l44dO/Y4WygIQikR+YloSAkD6ICuW1QALl68aC0pKalWAwgEAtmFhYXenp4e2RNqamouHT9+XIbgcrmaTSbTxwoAhAGyga6ZICoA03kAAMBYs9k84HQ6M7BfVVX1k91ufwL7bre7qaCg4ANFB5ANUBzpBkErgAeIKF0N4NSpU2NIg2fPnn2EfVoNobq6+seWlpYn8ZnX623Mzc19XxUGukGYKwAcDw0AgDSn07mnuLi4bqYgNplM/S6XKxPH1NbW/tDc3PwU9n0+3yc5OTnwBIghtEAXCFoBoA5IvXz5snVkZCR5bGwscXx8XAwGgwmhUGhJKBQSgsHgEovFYoGxagiVlZXfnzhx4mm839/ffygrK+tDPSFoAcCFELxgGUAoHnG/UiFyqSyeO3du0/r1619RNOF3p9OZpWjCd3a7/Zn5AEELAC6F4QUoiACCjcdneAASyuXkjo6O18vKyl4Nh1BbW/ttc3Pzs3pDmCsA3O/UCit6AE2AwTBc/RmgAM5Sh8Pxxrp1614Lh7B169Zvjhw58pyeELQA4N6fV5sNR5HEDwBhAAiRVIfDUTkdhG3btn19+PDh58MgcLPEwhizNKkFgFzVqoxVD0MAgDtG7hkMilYsczgcVdNB2LFjx4XGxsYXVNnhI6VtRqmMhkk9WOH9u9JIaQUwVd2GpUB8HwNRiyW8IA0gIkHYuXPn+YMHD2K4QlevXm3s6+v7KiUlZUIUxVBiYmIIA5Xk5OQg9letWvWlarIUlXdECyBSCcBTo6nWWckWMoSOjo7KsrKyTeGasHv37vMNDQ0yhEjb0NBQQ1pa2nuq2iEqT4gVAA4TiOK0ECJ5gtVqPW+z2SJCGBgYOJSZmYkCinUiqo4ylgCigXDBZrPJmiBJkjsQCORv3Lix8/Tp0yW9vb2f5efnQyPQTAECAGgOg1gDuBOEtEjZ4cCBA127du0yS5J0LRAI5FksFteZM2eKe3p6jhYWFtqIaFjpJaLqKO8FgEgQoAfpEEev12vLzs5eo2jCVBdZX1/f3dTUlBoIBHLLy8u7MVkKa6kxX8SQdV57gDpjsCbIIzUFgNHn832alZUlj82wFRQUeNxu94PY5ylTeXn5z+3t7WucTmeL2WzGTOEP1YB1QQBQe8LUVAlh3t/ffzQjI6NYrfx5eXnXPB5PHr8XBqBBAQAdgAdozgT3KgTUtuGayAzcTEnXr1+3r1y50iRJUh/cfboU+H8CAPtQPqOZQjcp3bhx4/MVK1ZA8O4IoLOz015aWsohsCA9AACgBQCAMtl48+bN1uXLl08NT2cqhBa6BrBt6BnQLGG6nH7r1q02SZJKZjKcP1vIWUBtH4/XZR2w2+0vDQ4OGkZHR1PGx8cTJyYmECLyhp/XRFG8nZSUNGYwGEYlSRrevHnzFwutDghfXAihPDBRvIAnS0iPPF/gc5DiUOyg6kPex09reCyYSnA6z+aWGRB4bqA2HhrBGYr/V8AQ8Lsi/7aIYeq87gVmCmuEAY/XeNWRHvlPF+pzMRjBAwYDBHI/T5I11wBcmMxGe2JxDM8NeIzGhvNQRX1NHoowCB6U8Pua70+PQii8KOIhivpZvTjh/zGaVxMhzeTny4l6e4DuHOIAdF8CnW8g7gE6L4Dul497gO5LoPMNxD1A5wXQ/fJxD9B9CXS+gbgH6LwAul9+0XvAv1shwF9pOYb/AAAAAElFTkSuQmCC"/>
</defs>
</svg>

`