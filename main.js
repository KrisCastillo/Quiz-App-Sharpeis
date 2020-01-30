const STORE = {
    questions: [
      {
      //1
        question: "The ears of the Shar‐Pei are:",
        options: [
          "Cropped into equilateral triangles", 
          "Extremely small rather thick, equilateral triangles", 
          "Pricked", 
          "Pendulous"
        ],
        answer: "Extremely small rather thick, equilateral triangles"
      },
      //2
      {
        question: "Correct coat length is:",
        options: [
          "1 inch or more on the tail",
          "1 inch or more on the withers", 
          "No longer than ½ inch on the withers",
          "No longer than 1 inch at the withers"
        ],
        answer: "No longer than 1 inch at the withers"
      },
      //3
      {
        question: "How long do Shar Peis live?",
        options: [
          "7 – 9 years", 
          "9 – 11 years", 
          "11 – 13 years", 
          "None of the above"
        ],
        answer: "9 – 11 years"
      },
      //4
      {
        question: "Where do Shar Peis originate from?", 
        options: [
          "China", 
          "Australia", 
          "Japan", 
          "Europe"
        ],
          answer: "China"
      },
      //5
      {
        question: "Can Shar Peis be left alone?",
        options: [
          "They will always want to be with you and like being left alone", 
          "They will always don’t want to be with you and like being alone", 
          "They will always want to be with you and dislike being left alone", 
          "None of the above"
        ],
        answer: "They will always want to be with you and dislike being left alone"
      },
      //6
      {
        question: "What weather can Shar Peis  handle better?",
        options: [
          "Warm weather", 
          "Cold weather", 
          "Humid weather", 
          "Raining weather"
        ],
        answer: "Cold weather"
      },
      //7
      {
        question: "What were shar Peis originate for?",
        options: [
          "Domestic pet", 
          "Hunting and dog fighting", 
          "Childcare", 
          "Home care"
        ],
        answer: "Hunting and dog fighting"
      },
      //8
      {
        question: "The height of the Shar‐Pei is:", 
        options: [
          "16‐20 inches", 
          "18‐20 inches", 
          "18‐22 inches", 
          "20‐22 inches"
        ],
        answer: "18‐22 inches"
      },
      //9
      {
        question: "Why do Shar Peis shake their heads?",
        options: [
          "They are angry", 
          "They have an inflammation of the external ear canal", 
          "They are wet and do not like to be like this", 
          "They play like that"
        ], 
        answer: "They have an inflammation of the external ear canal"
      },
      //10
      {
        question: "How many types of Shar Pei are there?",
        options: [
          "Three different coat types: horse, brush, and bear-coat", 
          "Two different coat types: horse and brush", 
          "One : bear-coat", 
          "None of the above"
        ],
        answer: "Three different coat types: horse, brush, and bear-coat"      
      }
    ],
    currentQuestion: 0,
    score: 0
  };
  
  //start quiz button
  function startQuiz() {
      $('#start').on('click', function(event){
        renderAQuestion();
      }
      );
    }

    //results and restart quiz button
    function displayResults() {
        let resultHtml = $(
          `<div class="results">
            <form id="js-restart-quiz">
              <section>
                <div class="sharpei-quiz">
                  <div class="Quiz">
                    <legend class="try-again"> Your final score is: ${STORE.score}/${STORE.questions.length}</legend>
                  </div>
                </div>
              
                <div class="sharpei-quiz">
                  <div class="Quiz">
                    <button type="button" id="restart"> Try Again </button>
                  </div>
                </div>
              </section>
          </form>
          </div>`);
          STORE.currentQuestion = 0;
          STORE.score = 0;
        $("main").html(resultHtml);
      }
    
   //displays the question
    function renderAQuestion() {
      let question = STORE.questions[STORE.currentQuestion];
      updateQuestionAndScore();
      const questionHtml = $(`
      <div>
        <form id="js-questions" class="question-form">
          
          <section>
            <div class="question">
              <div class="Quiz">
                <legend> ${question.question}</legend>
              </div>
            </div>
    
            <div class="options">
              <div class="Quiz">
                <div class="js-options"> </div>
            </div>
          </div>
        
    
          <div class="sharpei-quiz">
            <div class="Quiz">
              <button type = "submit" id="answer" tabindex="5">Submit</button>
              <button type = "button" id="next-question" tabindex="6"> Next >></button>
            </div>
          </div>
        </section>
        </form>
      </div>`);
    $("main").html(questionHtml);
    updateOptions();
    $("#next-question").hide();
    }
    
    //question number and score
     function updateQuestionAndScore() {
      $('h1').hide();
      const html = $(`<ul>
          <li class="question-number" id="js-answered">Question: ${STORE.currentQuestion + 1}/${STORE.questions.length}</li>
          <li class="score-number" id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li>
        </ul>`);
      $(".question-and-score").html(html);
    }
    
    //options for the question
    function updateOptions()
    {
      let question = STORE.questions[STORE.currentQuestion];
      for(let i=0; i<question.options.length; i++)
      {
        $('.js-options').append(`
            <input type = "radio" name="options" id="option${i+1}" value= "${question.options[i]}" tabindex ="${i+1}"> 
            <label for="option${i+1}"> ${question.options[i]}</label> <br/>
            <span id="js-r${i+1}"></span>
        `);
      }
      
    }
    
    
    /* checks whether it reached the end of questions list */
    function handleQuestions() {
      $('body').on('click','#next-question', (event) => {
        STORE.currentQuestion === STORE.questions.length?displayResults() : renderAQuestion();
      });
    }
    
    
    // rigth or wrong answer  
    function handleSelectOption() {
      $('body').on("submit",'#js-questions', function(event) {
        event.preventDefault();
        let currentQues = STORE.questions[STORE.currentQuestion];
        let selectedOption = $("input[name=options]:checked").val();
        
        if (!selectedOption) {
          alert("You must choose an option");
          return;
        } 
          $('span').removeClass("right-answer wrong-answer");
        
        if(selectedOption === currentQues.answer) {
          STORE.score++; 
          $('h1').hide();
          $('#next-question').show();
          $('.question-form .question').hide();
          $(`.options`).html(
            `<h3 class="great">Great!.....Correct Answer.</h3>
            <img src="images/happy.png" alt="happy sharpei" class="images" width="150px"><br/>`
          );
          }
        else {
          $('.question-form .question').hide();
          $(`.options`).html(
            `<h3 class="wrong">Sorry!.....Wrong Answer.</h3> 
            <p class="answer"> The answer is:</br> "${currentQues.answer}"</p>
            <img src="images/sad.png" alt="sad sharpei" class="images" width="150px"><br/>`
          );
        }
  
        STORE.currentQuestion++;
        $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
        $('#answer').hide();
        $("input[type=radio]").attr('disabled', true);
        $('#next-question').show();
      });
    }

    
  
    function restartQuiz() {
      $('body').on('click','#restart', (event) => {
        renderAQuestion();
      });
    }
    
    function handleQuizApp() {
      startQuiz();
      handleQuestions();
      handleSelectOption();
      restartQuiz();
    }
    
    $(handleQuizApp);