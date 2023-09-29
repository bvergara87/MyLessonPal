const typePreamble = (
  type: string,
  subject: string,
  gradeLevel: string,
  topic: string,
  additionalNotes?: string,
  context?: string,
  selection?: string
) => {
  let preamble = "";
  switch (type) {
    case "Worksheet":
      preamble += ` Include a place at the top of the page for the students name and the date. 
      
      Worksheets should allow a student to apply and exercise their knowledge independent of the teacher. Provide clear instructions and learning objectives. Make it clear how a student should demonstrate their understanding. 

      For procedural questions, provide an example solution that helps model how the student should complete the related questions. When conceptual questions, include passages and information that helps the student learn new information and complete the worksheet.

      The worksheet should include questions or tasks for a student to complete.
      
      Use language that is appropriate for ${gradeLevel} grade level. 
      
      Leave enough white space for the students to answer the questions. 

      Include an answer key at the end of the worksheet.
      
      `;
      break;
    case "Plan":
      preamble += `The lesson plan should be designed for one class of approximately 50 minutes in length, unless otherwise stated.
      
      The lesson plan is the teacher’s road map of what students need to learn and how it will be done effectively during the class time. A successful lesson plan addresses and integrates these three key components: Objectives for student learning, teaching/learning activities, and strategies to check student understanding. 
      
      The lesson plan should begin with a review of prerequisite knowledge. Alert students of the lesson and then present new information a little at a time.
      
      Model procedures, give clear samples, and check often to make sure students understand. Allow substantial practice with the new information. Ask lots of questions to allow students to correctly repeat or explain a procedure or concept. 
      
      It’s important to represent the learning topic through a variety of examples, analogies, and connections to other knowledge. The lesson plan should anticipate and interpret student errors, represent ideas in multiple forms and develop alternative explanations. 
      
      The lesson plan should specify concrete objectives for student learning and outline teaching and learning activities that will be used in class. 
      
      It will also define how the teacher will check whether the learning objectives have been accomplished. The lesson plan should include ways for teachers to check student mastery and understanding by posing questions, providing examples, and correcting misconceptions.
      
      The lesson plan should be clear about what students will learn and how they should show or demonstrate understanding of the material.
            `;
      break;

    case "Script":
      preamble += `The lesson script should be designed to be approximately 20 minutes in length, unless otherwise stated. The lesson script should be modeled on the Direct Instruction method developed by Siegfried Engelmann.
      
      Create separate lines for both the teacher cues and student responses. Include the correct answers for how the students should respond.

      The following quotation is an example of how to structure an lesson script. Use it for formatting and structure, not content. The content should only be related to ${topic}: 
      "Display 3 Phases of Matter chart) 
• You’re going to learn about matter. All things that you can see or touch are matter. Clouds are matter, cloth is matter, dirt is matter, and trees are matter.\n

• Here’s a fact about matter: Matter has three phases—solid, liquid, gas.\n

• Everybody, what are the three phases of matter? (Signal.) Solid, liquid, gas.\n

b. The solid phase is the coldest phase. (Point to the solid block on chart.) The solid phase of water is ice.\n

• When you heat a solid phase of matter enough, it will turn into liquid matter. So liquid is the next hottest phase of matter. (Point to the puddle.)\n

• If you heat a liquid enough, it will change into the gas phase of matter. That’s the hottest phase of matter. The gas phase of water is steam. (Point to gas.)\n

When matter is in the gas phase, it moves freely, like the air.\n

c. Remember the fact: All matter has three phases—solid, liquid, gas.\n

• Your turn. How many phases of matter are there? (Signal.) 3.\n

• Say the three phases. (Signal.) Solid, liquid, gas.\n

• What’s the coldest phase? (Signal.) Solid.\n

• What’s the next hottest phase? (Signal.) Liquid.\n

• What’s the hottest phase? (Signal.) Gas.\n

(Repeat step c until firm.)\n

d. Here’s a fact about the sun: The surface of the sun is 11,000 degrees Fahrenheit. How hot is the sun's surface? (Signal.) 11,000 degrees Fahrenheit.\n

The lesson script includes explicit and carefully sequenced instruction provided by the teacher (model) along with frequent opportunities for students to practice their skills with teacher-delivered feedback (guided practice) and then on their own (independent practice) over time (distributed practice/review).\n
    
      For example, if the sound /m/ appeared for the first time, the teacher might say, "You're going to learn a new sound. My turn to say it. When I move under the letter, I'll say the sound. I'll keep on saying it as long as I touch under it. Get ready. mmm. My turn again. Get ready. mmm." This teacher-modeled 
      instruction would then be followed by student practice opportunities. For example, "Your turn. When I move under the letter, you say the sound. Keep on saying it as long as I touch under it. Get ready." (students respond). "Again. Get ready." (students respond). 
      If an error occurs during instruction, the teacher would model the sound ("My turn. "mmm"), use guided practice ("Say it with me. mmm"), and have students practice independently ("Your turn. Get ready"). A "starting over" would be conducted based on this error; this 
      might include starting over at the top of a column or row of sounds so that students get increased practice on the /m/ sound. The /m/ would appear throughout the lesson and in subsequent lessons to ensure skill mastery (firm responding) over time.

      Based on the topic to be taught, provide specific sequences of problems to ask or pairs of problems that make some idea more clear through their variation from each other. Teachers should be given clear instructions and lines to speak to the students.

      Students should be expected to respond to the question in unison. Provide enough sequences to last approximately 20 minutes of direct instruction time. 
      
      The lesson script should ensure that learners are taught in groups whom are constituted by ability, attention focused on the teacher, provides scripted presentation of carefully designed instruction, active responding as a group and individually, responding is cued by the teacher, frequent feedback and correction, and a high pace.
      
            `;
      break;

    case "Activity":
      preamble += `The activity helps students learn and reinforce academic knowledge. The activity should have a clearly defined learning objective and goal. Be clear about what students will learn and how they should show or demonstrate understanding of the material by completing the activity. The activity should put students in situations which are likely to provoke required learnings. 
      
      The activity should present what is to be learned in the context of real-world problems, activate relevant prior knowledge and experience, demonstrate what is to be learned rather than just telling it, allow students to apply their newly learned knowledge and skills, and finally integrate or transfer the knowledge and skills in authentic situations. 
      
      The activity should encourage students to work together and help each other. Structure activities to include cues that highlight meaningful chunks of information which emphasize a problem’s underlying conceptual meaning. 
      
      The activity should encourage students to self-explain. 
      
      Make the activity fun and engaging for the student. Include hands-on activities, when possible, that can be completed with resources found in a typical classroom. An activity should typically take between 20 to 40 minutes to complete. 
      `;
      break;
    case "Project":
      preamble += `
      The project is a way for students to gain knowledge and skills by working for an extended period of time to investigate and respond to an authentic, engaging, and complex question, problem, or challenge. The project should have a clear learning objective and goal. It should also include a well defined project rubric.
      
      The project should be a purposeful and authentic experience that deepens knowledge of the learning topic. A project should take multiple class periods to complete. 
      
      Be clear about what students will learn and how they should show or demonstrate understanding of the material. Clearly communicate the learning goals. 
      
      Encourage students to utilize the project rubric to self evaluate their progress. Provide students with relevant background information and opportunities to explore the learning topic through research and discussion. Give clear samples and model what a good project should look like. Make the project fun and engaging. It should encourage students to build, create, or make an artifact to demonstrate their understanding and learning. 
      `;
      break;
    case "Quiz":
      preamble += `A quiz is a quick and informal assessment of student knowledge. It tests the students' level of comprehension and provides the teacher with insights into student progress and any existing knowledge gaps.
      
      Include a place at the top of the page for the students name and the date. 
      
      Use language that is appropriate for ${gradeLevel} grade level. 
      
      Leave enough white space for the students to answer the questions. 
      
      Anticipate and interpret student errors, represent ideas in multiple forms and develop alternative explanations. 
      
      Make it clear how a student should demonstrate their understanding. 
      
      Include a bonus question. 
      
      Include an answer key at the end of the quiz.
      `;
      break;
    case "Test":
      preamble += `The specific topic for the test is ${topic}. 
        
      The test is a longer and formal assessment of student knowledge. 
      
      It tests the students' level of comprehension and provides the teacher with insights into student progress and any existing knowledge gaps.
      
      Include a place at the top of the page for the students name and the date. 
      
      Use language that is appropriate for ${gradeLevel} grade level. 
      
      Leave enough white space for the students to answer the questions. 
      
      Anticipate and interpret student errors, represent ideas in multiple forms and develop alternative explanations. 
      
      Make it clear how a student should demonstrate their understanding. 
      
      Include a bonus question. 
      
      Include an answer key at the end of the test. 
      `;
      break;
    default:
      preamble += `The specific topic for the ${type} is ${topic}. Here are additional notes and information to consider when ${
        context && context !== "" ? "adjusting" : "creating"
      } the resource: ${additionalNotes}`;
  }
  return preamble;
};
export const generatePrompt = (
  type: string,
  subject: string,
  gradeLevel: string,
  topic: string,
  additionalNotes?: string,
  context?: string,
  selection?: string
) => {
  let prompt = `Your purpose is to create classroom resources for teachers.
  
  Create a detailed ${type} for the subject ${subject} targeted at the ${gradeLevel} grade level.
  
  The specific topic for the ${type} is ${topic}. 
  `;
  if (additionalNotes && additionalNotes !== "") {
    prompt += `Consider these additional notes when creating the ${type}: ${additionalNotes} `;
  }

  prompt += `Adhere to the following guidelines when creating the ${type}: `;
  prompt += typePreamble(
    type,
    subject,
    gradeLevel,
    topic,
    additionalNotes,
    context,
    selection
  );

  return prompt;
};

export const regeneratePrompt = (
  type: string,
  subject: string,
  gradeLevel: string,
  topic: string,
  additionalNotes?: string,
  context?: string,
  selection?: string
) => {
  let prompt = `Your purpose is to create classroom resources for teachers.
  `;
  if (context) {
    prompt += `
  This is the previously generated ${type} for reference:

  ${context}

  `;
  }
  if (selection && selection !== "") {
    prompt += `Make adjustments to the previously generated ${type}. 
    
  Specifically adjust this part of the resource: ${selection}
  
  Do not change any other parts of the resource.
  
  `;
  }

  prompt += `Consider these changes when adjusting the resource: ${additionalNotes}
  
  `;

  prompt += `Adhere to the following guidelines when adjusting the ${type}: 
  `;

  prompt += typePreamble(
    type,
    subject,
    gradeLevel,
    topic,
    additionalNotes,
    context,
    selection
  );
  return prompt;
};
