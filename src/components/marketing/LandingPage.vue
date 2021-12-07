<template>
  <section class="landing">
    <figure class="landing__photos">
      <!-- <img class="landing__photo landing__photo--up"
                    src="https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?cs=srgb&dl=business-code-coding-943096.jpg&fm=jpg?fit=crop&crop=entropy&w=640&h=426"
                    alt="pixabay.com"> -->
      <!-- <img class="landing__photo 
                landing__photo--down
                "
                    src="https://images.unsplash.com/photo-1555178364-6c1f870e3349?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                    alt="pixabay.com"> -->
    </figure>
    <article class="landing__content">
      <h2 class="landing__header">T-Manager</h2>
      <p
        class="
          landing__paragraph landing__paragraph--undertitle
        "
      >
        Online memo Card
      </p>
      <p class="landing__paragraph">
        Commodo dolor velit ut et pariatur. Esse cillum aute esse incididunt
        ullamco est proident. Nisi occaecat consequat quis minim dolore dolor id
        ea sint aliqua.
      </p>
      <p class="landing__paragraph">
        Ullamco dolore sunt mollit velit commodo tempor deserunt id esse et
        occaecat cupidatat commodo. Dolor id eu eiusmod reprehenderit tempor
        officia amet eu. Anim ipsum proident nostrud et qui mollit excepteur
        duis veniam ipsum.
      </p>
    </article>
  </section>
</template>

<style lang="scss">
.landing {
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #000;
  &__photos {
  }
  &__photo {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
  &__content {
    background-image: url("https://image.freepik.com/free-photo/notepad-with-pen-dark-background_181624-182.jpg"),
      linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4));
    background-blend-mode: overlay;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5vh;
  }
  &__header {
    margin-bottom: 5px;
    font-size: 2em;
  }
  &__paragraph {
    margin-bottom: 15px;
    text-align: justify;
    @media screen and (min-width: 600px) {
      width: 50%;
    }

    &--undertitle {
        text-align: center;
      text-transform: uppercase;
    color: #ff8c00;
    text-shadow:  1px 2px 1px  #000;
    font-weight: bold;
    }
  }
}
</style>
