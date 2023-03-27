import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string="TITULO VEM AQUI"

  questions:any
  questionSelected:any

  answers:string[] =[]
  answerSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex = 0

  finished:boolean = false

  constructor(){}
  ngOnInit():void{
    if(quizz_questions){
      this.finished= false
      this.title = quizz_questions.title
      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }
  }

  playerChoose(val:string){
    this.answers.push(val)
    console.log( this.answers )
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex += 1
    if( this.questionMaxIndex > this.questionIndex ){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
      console.log('valor do answers', this.answers )
    }
  }

  async checkResult(answer:string[]){
    const result = answer.reduce((prev,curr, index,arr) =>{
      if(
        arr.filter(item => item === prev).length >
        arr.filter(item => item === curr).length
      ){
        return prev
      }else{
        return curr
      }
    })
    console.log(result)
    return result
  }

}
